import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import config from '../config/config';
import Account from '../models/Account';

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.JWT_TOKEN,
};

export default new Strategy(opts, async (payload, done) => {
	try {
		const user = await Account.findOne({ _id: payload.id });

		if (!user) return done(null, false);

		return done(null, user);
	} catch (e) {
		done(null, false);
		console.log(e);
		console.log('Passport-jwt strategy Error');
	}
});
