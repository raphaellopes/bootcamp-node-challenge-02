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
};

module.exports = new AppointmentController();
