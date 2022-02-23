const { ironSession } = require('iron-session/express');
const { compare } = require('bcrypt');
const { Router } = require('express');
const { addAsync } = require('@awaitjs/express');
const { sessionOptions } = require('../../shared/lib/auth');
const { prisma } = require('../lib/prisma');

const router = addAsync(Router());

const session = ironSession(sessionOptions);

router.postAsync('/login', session, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({
        message: 'Invalid Password!',
      });
    }

    req.session.user = {
      id: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    await req.session.save();

    return res.send({ ok: true });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.getAsync('/logout', async (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = {
  authRouter: router,
};
