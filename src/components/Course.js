import { insert, update, read, remove } from '../services/apiService';
import { useEffect, useState } from 'react';

const Course = ({ match, history }) => {

    const [id] = useState(match.params.id);
    const [course, setCourse] = useState({
        _id: '0',
        name: '',
        points: 0
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id !== '0') {
            read('courses', id, data => {
                if (data) {
                    setCourse(data);
                }
            })
        }
    }, [id]);


    function changeHandler(e) {
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        })
    }
    const back = () => {
        history.push('/courses');
    }

    const save = () => {
        course._id = undefined;
        if (!course.name || !course.points) {
            setMessage('Required field');
        } else {
            if (id === '0') {
                insert('courses', course, data => {
                    if (data._id) return history.push('/courses');
                    console.log("There was an error in saving data");
                })
            } else {
                update('courses', id, course, data => {
                    if (data) return history.push('/courses');
                    console.log("There was an error in saving data");
                    console.log(data);
                    console.log(course);
                    console.log(id);
                });
            }
        }
    }

    const del = () => {
        remove('courses', id, data => {
            history.push('/courses')

        })
    }
    return (
        <div className="container">
            <h2>Course</h2>
            <form className='input-form'>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='name'>Course name: </label>
                    <input
                        type='text'
                        name='name'
                        value={course.name}
                        onChange={changeHandler}
                        required
                    />
                    <div className='validation-message'>{message}</div>
                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='points'>Course points: </label>
                    <input
                        type='text'
                        name='points'
                        value={course.points}
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

export default Course;