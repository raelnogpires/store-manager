const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

const nameExist = async (req, res, next) => {
  const { name } = req.body;

  if (name === undefined || typeof name !== 'string' || name.length === 0) {
    return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  }

  next();
};

const nameLength = async (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      { message: '"name" length must be at least 5 characters long' },
    );
  }

  next();
};

const nameValidation = [nameExist, nameLength];

module.exports = { nameValidation };