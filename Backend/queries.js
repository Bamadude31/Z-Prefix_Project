const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { first_name, last_name, email, username, password } = request.body;

  // Validate required fields
  if (!first_name || !last_name || !email || !username || !password) {
    return response.status(400).json({ message: 'All fields are required' });
  }

  const insertValues = [first_name, last_name, email, username, password];
  const insertColumns = ['first_name', 'last_name', 'email', 'username', 'password'];

  const columnPlaceholders = insertColumns.map((_, index) => {
    return `$${index + 1}`;
  });

  pool.query(
    `INSERT INTO users (${insertColumns.join(', ')}) VALUES (${columnPlaceholders.join(', ')}) RETURNING id`,
    insertValues,
    (error, results) => {
      if (error) {
        throw error;
      }
      const insertedId = results.rows[0] ? results.rows[0].id : null;
      response.status(201).send(`User added with ID: ${insertedId}`);
    }
  );
};

const updateUser = (request, response) => {
  const { id, first_name, last_name, email, username, password } = request.body;

  // Validate required fields
  if (!id || !first_name || !last_name || !email || !username || !password) {
    return response.status(400).json({ message: 'All fields are required' });
  }

  const updateValues = [first_name, last_name, email, username, password, id];
  const updateColumns = ['first_name', 'last_name', 'email', 'username', 'password'];

  const setExpressions = updateColumns.map((col, index) => {
    return `${col} = $${index + 1}`;
  });

  pool.query(
    `UPDATE users SET ${setExpressions.join(', ')} WHERE id = $${updateValues.length}`,
    updateValues,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = request.params.id;

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const getItems = (request, response) => {
  pool.query('SELECT * FROM items ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getItemById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM items WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createItem = (request, response) => {
  const { name, email } = request.body;

  pool.query('INSERT INTO items (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Item added with ID: ${results.insertId}`);
  });
};

const updateItem = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE items SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Item modified with ID: ${id}`);
    }
  );
};

const deleteItem = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM items WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Item deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
}