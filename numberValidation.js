function testIfNumber(num) {
  num = Number(num);
  if (num) {
    return num;
  } else {
    throw new Error('Input is not a Number');
  }
}

function testIfPositiveNumber(num) {
  num = testIfNumber(num);
  if (num > 0) {
    return true;
  } else {
    return false;
  }
}

function testIfZeroOrGreater(num) {
  num = testIfNumber(num);
  if (num >= 0) {
    return num;
  } else {
    throw new Error('Input is not zero or greater');
  }
}

function testIfInteger(num) {
  num = testIfZeroOrGreater(num);
  if (Number.isInteger(num)) {
    return num;
  } else {
    throw new Error('Input is not a whole number');
  }
}

function testIfHundrethsPlace(num) {
  num = testIfZeroOrGreater(num);
  if (Number.isInteger(num * 100)) {
    return num;
  } else {
    throw new Error('Input is not a valid number.  Please enter valid price');
  }
}
module.exports = {
  testIfNumber,
  testIfPositiveNumber,
  testIfZeroOrGreater,
  testIfInteger,
  testIfHundrethsPlace
};
