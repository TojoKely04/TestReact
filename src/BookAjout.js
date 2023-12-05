import React, { useEffect, useState } from 'react';
import { Label , Input, Form, FormGroup, Container , Button } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link , useNavigate   } from 'react-router-dom';
import { Navigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const BookEdit = () => {
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        
        event.preventDefault();
        const form = event.currentTarget;
    
        const titre = form.elements.titre.value;
        const prix = form.elements.prix.value;
        const date = form.elements.publishdate.value;

        try{
        const formData = {
            "title":titre,
            "publishDate":date,
            "price":prix
        };
        console.log(JSON.stringify(formData));
        const response = await fetch(`/books`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            // La requête a réussi, vous pouvez effectuer des actions supplémentaires si nécessaire
            console.log('Objet inséré avec succès !');
            navigate("/books");
        } else {
            // La requête a échoué, gérer les erreurs si nécessaire
            console.error('Erreur lors de l\'insertion de l\'objet');
          }
        } catch (error) {
            alert('Erreur réseau :', error);
        }
    };

    return(
        <div>
            <AppNavbar/>
            <Container>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                    <Label for="titre">
                        Titre
                    </Label>
                    <Input
                        id="titre"
                        name="titre"
                        placeholder="Titre"
                        type="text"
                    />
                    </FormGroup>
                    <FormGroup>
                        <Label for="prix">
                        Prix
                        </Label>
                        <Input
                        id="prix"
                        name="price"
                        placeholder="Prix"
                        type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="publishdate">
                        Date de publication
                        </Label>
                        <Input
                        id="publishdate"
                        name="date"
                        placeholder="Date de publication"
                        type="date"
                        />
                    </FormGroup>
                    <div>
                    <Button
                        color="primary"
                        type='submit'
                    >
                        Click Me
                    </Button>
                    </div>
                </Form>
                </Container>
        </div>
    );
};

export default BookEdit;