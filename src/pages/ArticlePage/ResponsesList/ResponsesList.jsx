/* eslint-disable react/prop-types */
import ResponseCard from "../../../components/ResponseCard/ResponseCard";

const ResponsesList = ({ responses }) => {
  return (
    <section className="flex flex-col overflow-auto">
      {responses?.length < 1 ?
        <div className="py-6 flex flex-col justify-center items-center">
          <h2 className="text-xl">No response yet</h2>
          <small className="opacity-60">Be the first to respond.</small>
        </div>
        :
        responses?.map((response) => (
          <ResponseCard key={response?._id} response={response}/>
        ))
      }
    </section>
  )
};

export default ResponsesList;