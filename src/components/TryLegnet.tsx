const TryLegnet = ({ scrollToForm }: { scrollToForm: () => void }) => {
  return (
    <button onClick={scrollToForm} className="flex justify-self-center px-8 py-2 uppercase font-medium transition-all duration-300 cursor-pointer bg-[#c5ff00] rounded-full hover:drop-shadow-[0_0_10px_#c5ff00] hover:scale-105">
      Solicite uma Demonstração
    </button>
  )
}

export default TryLegnet