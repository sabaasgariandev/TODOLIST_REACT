import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface CustomCheckboxProps {
    checked: boolean; // Type for checked prop
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Type for onChange prop
    label: string; // Type for label prop
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, label }) => {
    return (
        <FormControlLabel 
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    sx={{
                        '&.Mui-checked': {
                            color: '#ee9ca7',
                            borderRadius: '50%' 
                        },
                        '&.MuiCheckbox-root': {
                            color: '#ee9ca7',
                            borderRadius: '50%'
                        },
                        borderRadius: '50%',
                        width: '35px', 
                        height: '35px',
                        '&:hover': {
                            backgroundColor: 'transparent', 
                        },
                    }}
                />
            }
            label={
                <span style={{ textDecoration: checked ? 'line-through' : 'none' }}>
                    {label} 
                </span>
            }
        />
    );
};

export default CustomCheckbox;