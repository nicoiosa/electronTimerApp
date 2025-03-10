const InputField = ({ label, value, onChange, placeHolder }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value
    if (/^\d+$/.test(inputValue)) {
      onChange(e)
    }
  }
  return (
    <div className="text-[28px]/[34px]">
      <label className="text-stone-300">{label}:</label>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        placeholder={placeHolder}
        className={
          label == 'Horas'
            ? 'w-20 bg-transparent text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300'
            : 'w-12 bg-transparent text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300'
        }
      />
    </div>
  )
}

export default InputField
