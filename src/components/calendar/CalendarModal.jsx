import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
} from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      // null
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDataChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDataChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        'Error',
        'La fecha fin debe de ser mayor a la fecha de inicio',
        'error'
      );
    }

    if (title.trim() < 2) {
      return setTitleValid(false);
    }

    if (activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(
        eventStartAddNew(
          formValues
          // id y name se obtendran del backend
          // id: new Date().getTime(),
          // user: {
          //   _id: '123',
          //   name: 'Pedro',
          // },
        )
      );
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className='modal'
      overlayClassName='modal-fondo'
    >
      <h1> {activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>
      <hr />
      <form className='container' onSubmit={handleSubmitForm}>
        <div className='form-group mb-2'>
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            className='form-control'
            onChange={handleStartDataChange}
            value={dateStart}
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className='form-control'
            onChange={handleEndDataChange}
            value={dateEnd}
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control mt-2 mb-2 ${!titleValid && 'is-invalid'}`}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={title}
            onChange={handleInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control mt-2 mb-2'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <div className='d-grid'>
          <button type='submit' className='btn btn-outline-primary'>
            <i className='far fa-save'></i>
            <span> Guardar</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
