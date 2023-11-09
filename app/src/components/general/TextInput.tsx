import React from 'react';

type propTypes = {
  id?: string;
  placeholder?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  hidePassword?: boolean;
}

export default function TextInput(props: propTypes) {

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(event.target.value);
  }

  return (
    <>
      <label htmlFor="" className="-mb-5 ml-3 text-sm text-grayDark">{props.label}</label>
      <input id={props.id} type={props.hidePassword ? 'password' : 'email'} onChange={onChange}  value={props.value} className={"w-full rounded-md mt-0" + props.className} placeholder={props.placeholder} />
    </>

  );
}