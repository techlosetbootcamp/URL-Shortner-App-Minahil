import { inputType } from "@/constants/types/inputType";


function InputField({type="text",placeholder, value, label, onChange, disabled}:inputType){
    return(
        <input value={value} onChange={onChange} disabled={disabled} style={{
            borderColor: 'linear-gradient(89.92deg, #144EE3 -0.02%, #EB568E 18.86%, #A353AA 64.49%, #144EE3 100.67%)'
          }} className="shadow-custom border-4 text-text_secondary font-light text-[14px] bg-input_bg_clr border-input_border_clr rounded-[48px] py-[21px] pr-[25.19px] pl-[25px]" type={type} placeholder={placeholder} />
    );

}
export default InputField;