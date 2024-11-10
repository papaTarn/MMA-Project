const usePermission = () => {
  const view = true;
  const add = true;
  const update = true;
  const remove = true;

  return { view, add, update, remove };
};

export default usePermission;
