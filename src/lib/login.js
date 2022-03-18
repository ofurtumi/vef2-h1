import passport from 'passport';
import { Strategy } from 'passport-local';
import { comparePasswords, findById, findByUsername } from './users.js';

/**
 * Athugar hvort username og password sé til í notandakerfi.
 * Callback tekur við villu sem fyrsta argument, annað argument er
 * - `false` ef notandi ekki til eða lykilorð vitlaust
 * - Notandahlutur ef rétt
 *
 * @param {string} username Notandanafn til að athuga
 * @param {string} password Lykilorð til að athuga
 * @param {function} done Fall sem kallað er í með niðurstöðu
 */
 async function strat(username, password, done) {
    try {
      const user = await findByUsername(username);
  
      if (!user) {
        return done(null, false);
      }
  
      // Verður annað hvort notanda hlutur ef lykilorð rétt, eða false
      const result = await comparePasswords(password, user.password);
      return done(null, result ? user : false);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  }
  
  // Notum local strategy með „strattinu“ okkar til að leita að notanda
  passport.use(new Strategy(strat));
  
  // getum stillt með því að senda options hlut með
  // passport.use(new Strategy({ usernameField: 'email' }, strat));
  
  // Geymum id á notanda í session, það er nóg til að vita hvaða notandi þetta er
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Sækir notanda út frá id
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  export function requireAuthentication(req, res, next) {
    return passport.authenticate(
      'jwt',
      { session: false },
      (err, user, info) => {
        if (err) {
          return next(err);
        }
  
        if (!user) {
          const error = info.name === 'TokenExpiredError'
            ? 'expired token' : 'invalid token';
  
          return res.status(401).json({ error });
        }
  
        // Látum notanda vera aðgengilegan í rest af middlewares
        req.user = user;
        return next();
      },
    )(req, res, next);
  }
  app.get('/', (req, res) => {
    res.json({
      login: '/login',
      admin: '/admin',
    });
  });
  
  app.post('/login', async (req, res) => {
    const { username, password = '' } = req.body;
  
    const user = await findByUsername(username);
  
    if (!user) {
      return res.status(401).json({ error: 'No such user' });
    }
  
    const passwordIsCorrect = await comparePasswords(password, user.password);
  
    if (passwordIsCorrect) {
      const payload = { id: user.id };
      const tokenOptions = { expiresIn: tokenLifetime };
      const token = jwt.sign(payload, jwtOptions.secretOrKey, tokenOptions);
      return res.json({ token });
    }
  
    return res.status(401).json({ error: 'Invalid password' });
  });
  
  app.get('/admin', requireAuthentication, (req, res) => {
    res.json({ data: 'top secret' });
  });
  
  function notFoundHandler(req, res, next) { // eslint-disable-line
    res.status(404).json({ error: 'Not found' });
  }
  
  function errorHandler(err, req, res, next) { // eslint-disable-line
    console.error(err);
  
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ error: 'Invalid json' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
  
  // Hjálpar middleware sem athugar hvort notandi sé innskráður og hleypir okkur
  // þá áfram, annars sendir á /login
  export function ensureLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    app.use(notFoundHandler);
    app.use(errorHandler);

    return res.redirect('/admin/login');
  }

  
  export default passport;