import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import FeedbackItem from './FeedbackItem'
import Spinner from './shared/Spinner'


function FeedbackList() {
    const { feedback, loading} = useContext(FeedbackContext)

    if(!loading && (!feedback || feedback.length === 0)){
        return <p>no feedback yet!</p>
    }

    return loading ? <Spinner />
    : (
        <div className='feedback-list'>
            <AnimatePresence>
                {feedback.map((item)=>(
                    <motion.div key={item.id} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} layout>
                    <FeedbackItem key={item.id} item={item} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default FeedbackList
