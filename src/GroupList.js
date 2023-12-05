import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const GroupList = () => {

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('books')
      .then(response => response.json())
      .then(data => {
        setGroups(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`books/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...groups].filter(i => i.id !== id);
      setGroups(updatedGroups);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const groupList = groups.map(group => {
    return <tr key={group.id}>
      <td style={{whiteSpace: 'nowrap'}}>{group.id}</td>
      <td style={{whiteSpace: 'nowrap'}}>{group.title}</td>
      <td>{group.publishDate}</td>
      <td>{group.price}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/books/" + group.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(group.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });
  
  return (
    <div>
      <AppNavbar/>
      <Container>
        <div className="float-end">
          <Button color="success" tag={Link} to="/books/new/">Add Group</Button>
        </div>
        <h3>My JUG Tour</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Id</th>
            <th width="20%">Titre</th>
            <th>Publish Date</th>
            <th width="10%">Price</th>
          </tr>
          </thead>
          <tbody>
          {groupList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default GroupList;