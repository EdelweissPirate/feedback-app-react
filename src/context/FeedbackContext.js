import { createContext, useEffect, useState } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        console.log(error)
        fetchFeedback()
    }, [])


    const fetchFeedback = () => {
        setLoading(true)
        fetch("/feedback?_sort=id&order=desc")
            .then((response) => response.json())
            .then(setFeedback)
            .then(() => {setLoading(false)})
            .catch(setError)
    }

    
    if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    const updateFeedback = async (id, updItem) => {
        const putRequestOptions = {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(updItem)
        };

        fetch(`/feedback/${id}`, putRequestOptions)
            .then(response => response.json())
            .then((response) => {setFeedback(feedback.map((item) => item.id === id ? { ...item, ...response } : item))})
            .catch(setError)
    }

    const addFeedback = async (newFeedback) => {
        const postRequestOptions = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(newFeedback)
        };
        
        fetch('/feedback', postRequestOptions)
            .then(response => response.json())
            .then((response) => {setFeedback([response, ...feedback])})
            .catch(setError)
    }

    const deleteFeedback = (id) => {
        const deleteRequestOptions = {
            method: 'DELETE'
        };

        if(window.confirm("Confirm delete?")){
            fetch(`/feedback/${id}`, deleteRequestOptions)
            .then(response => response.json())
            .then(() => {setFeedback(feedback.filter((item) => item.id !== id))})
            .catch(setError)
        }
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    return <FeedbackContext.Provider value={{ feedback, deleteFeedback, addFeedback, editFeedback, feedbackEdit, loading, updateFeedback}}>
                {children}
            </FeedbackContext.Provider>
}

export default FeedbackContext