import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import UpdateBookForm from './UpdateBookForm';
import { BookModalProps } from '../types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const UpdateBookModal = ({ onSubmit, onClose, modalOpen, errMsg }: BookModalProps) => {
    return (
        <Modal open={ modalOpen } onClose={ onClose } centered={ false } closeIcon>
            <Modal.Header>Update a book</Modal.Header>
            <Modal.Content>
                { errMsg && <Segment inverted color='red'>{ `Error: ${errMsg}` }</Segment> }
                <UpdateBookForm onSubmit={ onSubmit } onClose={ onClose }/>
            </Modal.Content>
        </Modal>
    );
};

export default UpdateBookModal;