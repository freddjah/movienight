const createList = ListDAL => ({ name, displayName, movies }) => ListDAL.create({ name, displayName, movies });
const findByName = ListDAL => name => ListDAL.findOne({ name });
const removeAllEntries = ListDAL => () => ListDAL.remove({});

module.exports = ListDAL => ({
  createList: createList(ListDAL),
  findByName: findByName(ListDAL),
  removeAllEntries: removeAllEntries(ListDAL),
});
