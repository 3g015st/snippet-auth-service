const { Observable } = require("rxjs");
const logger = require("../utils/logger");

const create$ = (model, payload, opts) =>
  new Observable((subscriber) => {
    model
      .create(payload, opts)
      .then((data) => {
        subscriber.next(data);
        subscriber.complete();
      })
      .catch((err) => {
        logger.error(err);
        subscriber.error(err);
      });
  });

const update$ = (model, payload, where, opts) =>
  new Observable((subscriber) => {
    model
      .update(payload, { where, returning: true })
      .then(([rowsUpdated, [updatedObject]]) => {
        subscriber.next(updatedObject);
        subscriber.complete();
      })
      .catch((err) => {
        logger.error(err);
        subscriber.error(err);
      });
  });

const upsert$ = (model, payload, where, opts) =>
  new Observable((subscriber) => {
    model.findOne({ where, raw: true }).then((data) => {
      let step$;
      let initArgs = [model, payload];
      if (!data) step$ = create$;
      else {
        step$ = update$;
        initArgs.push(where);
      }
      step$(...initArgs).subscribe(
        (data) => {
          subscriber.next(data);
          subscriber.complete();
        },
        (err) => {
          logger.error(err);
          subscriber.error(err);
        }
      );
    });
  });

exports.create$ = create$;
exports.update$ = update$;
exports.upsert$ = upsert$;
