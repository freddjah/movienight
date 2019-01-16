const createList = ListDAL => ({ name, movies }) => ListDAL.create({ name, movies });
const findByName = ListDAL => ({ name }) => ListDAL.findOne({ name });

module.exports = ListDAL => ({
  createList: createList(ListDAL),
  findByName: findByName(ListDAL),
});
