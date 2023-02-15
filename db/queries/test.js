const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(res => {
      return res.rows;
    })
}
