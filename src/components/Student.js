import { insert, update, read, remove } from '../services/apiService';
import { useEffect, useState } from 'react';

const Student = ({ match, history }) => {

    const [id] = useState(match.params.id);
    const [student, setStudent] = useState({
        _id: '0',
        firstName: '',
        lastName: '',
        yearOfBirth: 0,
        address: ''
    });
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (id !== '0') {
            read('students', id, data => {
                if (data) {
                    setStudent(data);
                }
            })
        }
    }, [id]);


    function changeHandler(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
    }
    const back = () => {
        history.push('/students');
    }

    const save = () => {
        student._id = undefined;
        if (!student.firstName || !student.lastName || !student.address || !student.yearOfBirth) {
            setMessage('Required field');
        } else {
            if (id === '0') {
                insert('students', student, data => {
                    if (data._id) return history.push('/students');
                    console.log("There was an error in saving data");
                })
            } else {
                update('students', id, student, data => {
                    if (data) return history.push('/students');
                    console.log("There was an error in saving data");
                    console.log(data);
                    console.log(student);
                    console.log(id);
                });
            }
        }
    }

    const del = () => {
        remove('students', id, data => {
            history.push('/students')

        })
    }
    return (
        <div className="container">
            <h2>Student</h2>
            <form className='input-form' >

                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='firstName'>Student name: </label>
                    <input
                        className="right"
                        type='text'
                        name='firstName'
                        value={student.firstName}
                        onChange={changeHandler}
                        required
                    />
                    <div className='validation-message'>{message}</div>

                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='lastName'>Student surname: </label>
                    <input
                        className="right"
                        type='text'
                        name='lastName'
                        value={student.lastName}
                        onChange={changeHandler}
                        required
                    />
                    <div className='validation-message'>{message}</div>

                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='yearOfBirth'>Student birthyear: </label>
                    <input
                        className="right"
                        type='text'
                        name='yearOfBirth'
                        value={student.yearOfBirth}
                        onChange={changeHandler}
                        required
                    />
                    <div className='validation-message'>{message}</div>

                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='address'>Student address: </label>
                    <input
                        className="right"
                        type='text'
                        name='address'
                        value={student.address}
                        onChange={changeHandler}
                        required
                    />
                    <div className='validation-message'>{message}</div>

                </div>

                <hr />
                {(id !== '0' &&
                    <div className='left'>
                        <button type='button' onClick={del}>DELETE</button>
                    </div>)}
                <div className='right'>
                    <button type='button' onClick={back}>BACK</button>
                    &nbsp;&nbsp;
                    <button type='button' onClick={save}>SAVE</button>
                </div>
            </form>
        </div>)
}

export default Student;