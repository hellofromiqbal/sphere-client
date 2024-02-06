/* eslint-disable react/prop-types */
import { selectArticle } from '../../../redux/articleSlice';
import { useSelector } from 'react-redux';
import { IoIosCloseCircleOutline } from "react-icons/io";
import ResponseForm from "../../../components/ResponseForm/ResponseForm";
import ResponsesList from '../ResponsesList/ResponsesList';

const ResponseSec = ({ handleShowResponseSec }) => {
  const currentArticle = useSelector(selectArticle);
  return (
    <section className='fixed top-0 right-0 bottom-0 left-0 flex flex-col md:flex-row'>
      <div className='basis-2/12 md:basis-1/2 lg:basis-2/3 bg-black opacity-10' onClick={() => handleShowResponseSec()}></div>
      <div className="basis-10/12 md:basis-1/2 lg:basis-1/3 bg-white border-s shadow-2xl px-6 py-6 md:py-20 overflow-auto relative">
        <button onClick={() => handleShowResponseSec()} className="absolute top-6 md:top-20 right-6">
          <IoIosCloseCircleOutline className="w-[25px] md:w-[25px] h-[25px] md:h-[25px]"/>
        </button>
        <h1 className="text-xl font-medium">Responses ({currentArticle?.responses?.length})</h1>
        <ResponseForm/>
        <ResponsesList responses={currentArticle?.responses}/>
      </div>
    </section>
  )
}

export default ResponseSec