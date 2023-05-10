
import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Form } from 'react-bootstrap';
import { useHttpClient } from '../hooks/httpHook';
import Loader from '../components/Loader';

const UserListScreen = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const delete_user = async (user) => {
    try {
      var answer = window.confirm('בטוח שברצונך למחוק את המשתמש?');
      if (answer) {
        await sendRequest(
          `http://localhost:5000/api/users/${user.email}`,
          'DELETE'
        );
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateAdmin = async (user) => {
    try {
      user.isAdmin = !user.isAdmin;
      await sendRequest(
        `http://localhost:5000/api/users/updateAdmin/${user._id}`,
        'PUT',
        JSON.stringify({
          isAdmin: !user.isAdmin
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <>
      <h1>רשימת משתמשים</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>שם</th>
              <th>אימייל</th>
              <th>הרשאות מנהל</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loadedUsers?.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={user.isAdmin}
                    onChange={() => updateAdmin(user)}
                  />
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => delete_user(user)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
