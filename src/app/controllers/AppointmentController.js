const { Op } = require('sequelize');
const moment = require('moment');

const { User, Appointment } = require('../models');

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider);

    return res.render('appointments/create', { provider });
  }

  async store (req, res) {
    try {
      const { id } = req.session.user;
      const { provider } = req.params;
      const { date } = req.body;
      const data = {
        user_id: id,
        provider_id: provider,
        date
      };

      await Appointment.create(data);

      return res.redirect('/app/dashboard');
    } catch (error) {
      console.log({ error });
    }
  }

  async list (req, res) {
    const { params: { provider: provider_id }, query } = req;
    const date = query.date ? moment(parseInt(query.date)) : moment();
    const dateFormatted = date.format('DD/MM/YYYY');
    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      order: [
        ['date', 'DESC']
      ],
      where: {
        provider_id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    });

    return res.render('appointments/list', { dateFormatted, date, appointments });
  }
};

module.exports = new AppointmentController();
