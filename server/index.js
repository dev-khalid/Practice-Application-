const express = require('express');
const { sequelize, User, Post } = require('./models/index');
const requestIp = require('request-ip');
const webpush = require('web-push');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(requestIp.mw());
app.use(cors());

app.get('/', (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  const ip = req.clientIp;

  console.log(clientIp, ip);
  res.send('Hello from server side.');
});
app.post('/users', async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const user = await User.create({ name, email, role });
    res.json(user);
  } catch (err) {
    console.log('🔥🔥🔥', err);
    res.status(500).json(err);
  }
});
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ include: 'posts' });
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.get('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid }, include: 'posts' });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.patch('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });
    user.name = name;
    user.email = email;
    user.role = role;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.delete('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid } });
    await user.destroy();
    res.json({ message: 'user deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});
app.post('/posts', async (req, res) => {
  const { userUuid, body } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    const post = await Post.create({
      userId: user.id,
      body,
    });
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: 'user',
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

const publicVapidKey =
  'BCw9DyYE6hfa2rWNxwjxJbN_CcMniLbmIbpFs3lZNkCHYxJ9-n7F3FJPUHLmGCqtj0RG9Yroajg1weEyT-O6Wg4';
const privateVapidKey = '7OVsOID2th1_sZBUk6PAMeTGfJLYlxoXkOxhpaO4c_M';
webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post('/subscribe', (req, res, next) => {
  // Get pushSubscription object

  const x = req.body;
  const { subscription } = x;

  console.log(subscription);
  console.log(x.payload);
  // const payload = JSON.stringify({ title: 'khalid testing' });
  // Send 201 - resource created
  res.status(201).json({});
  // const payload = JSON.stringify({ title: 'Push Test' });

  // Pass object into sendNotification
  const payload = JSON.stringify(x.payload);
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

app.get('/notify', (req, res) => {
  console.log(req.subscription);
  // Create payload
  const payload = JSON.stringify({ title: 'Push Test' });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});
app.listen({ port: 5000 }, async () => {
  console.log('Server is running on port 5000');
  await sequelize.authenticate();
  console.log('Database Connected!');
});
