import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function ClothingItemDetails () {
    const {id} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const clothingItem = useSelector(store => store.clothingReducer.selectedItem);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch({
            type: 'SET_CLOTHING_ITEM',
            payload: clothingItem
        })
      }, []);

    const deleteItem = () => {
        handleClose();
        dispatch({
            type: 'SAGA/DELETE_CLOTHING_ITEM',
            payload: clothingItem.id
        })
        history.push(`/viewClothes`)
    }

    const editItem = () => {
        history.push(`/editClothes/${id}`)
    }

    const goBack = () => {
        history.goBack()
    }


    return(
        <div className="container">
            <Button size='md' variant='back' onClick={goBack}>Back</Button>
            <h2>{clothingItem.name}</h2>
            <br />
            <h4>{clothingItem.description}</h4>
            <br />
            <Button size='md' variant='edit' onClick={editItem}>Edit</Button>
            <Button size='md' variant='delete' onClick={handleShow}>Remove from Closet</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Remove clothing item from closet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This item will be removed from your closet AND activities. Are you sure you want to remove this item? 
                </Modal.Body>
                <Modal.Footer>
                <Button variant='back-modal' onClick={handleClose}>Cancel</Button>
                <Button variant='delete' onClick={deleteItem}>Remove from Closet</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ClothingItemDetails;