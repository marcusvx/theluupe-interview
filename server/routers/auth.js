const { ironSession } = require('iron-session/express');
const { compare } = require('bcrypt');
const { Router } = require('express');
const { addAsync } = require('@awaitjs/express');
const { sessionOptions } = require('../lib/auth');
const prisma = require('../lib/prisma');

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

    req.session.user = user;
    await req.session.save();

    return res.send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.getAsync('/profile', session, async function(req, res) {
  const { user } = req.session;
  if (!user) {
    return res.status(403).send({
      message: 'User not authenticated',
    });
  }

  res.send(user);
});

router.getAsync('/logout', session, async (req, res) => {
  const { session } = req;
  if (session) {
    session.destroy();
  }

  res.json({ status: 'ok' });
});

function toSessionUser(dbUser) {
  return;
}

module.exports = {
  authRouter: router,
};
