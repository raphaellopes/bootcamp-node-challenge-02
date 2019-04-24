const moment = require('moment');
const { Appointment } = require('../models');
const { Op } = require('sequelize');

class AvailableController {
  async index (req, res) {
    const { query, params } = req;
    const date = moment(parseInt(query.date));
    const appointments = await Appointment.findAll({
      where: {
        provider_id: params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    });

    const schedule = [
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ];

    const available = schedule.map(time => {
      const [hour, min] = time.split(':');
      const value = date.hour(hour).minute(min).second(0);

      return {
        time,
        value: value.format(),
        available: value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format('HH:mm') === time)
      };
    });

    return res.render('available/index', { available });
  }
}

module.exports = new AvailableController();
