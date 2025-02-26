import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Example() {
  // Danh sách các lựa chọn với ID kiểu string
  const options = [
    { id: '1', name: 'Bộ' },
    { id: '2', name: 'Đôi' },
    { id: '3', name: 'Cái' }
  ];

  // Khởi tạo giá trị mặc định là đối tượng { id: '2', name: 'Đôi' }
  const [selectedValue, setSelectedValue] = React.useState({ id: '2', name: 'Đôi' });
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    // Tìm đối tượng trong mảng options và cập nhật selectedValue
    const selected = options.find(option => option.id === event.target.value);
    if (selected) {
      setSelectedValue(selected);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-title">Select Inside Modal</h2>
          <FormControl fullWidth>
            <InputLabel id="select-label">Chọn loại</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={selectedValue.id} // Dùng ID để chọn item trong Select
              label="Chọn loại"
              onChange={handleChange}
            >
              {options.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ marginTop: 2 }}>
            <p>Selected Value: {selectedValue.name}</p> {/* Hiển thị tên giá trị đã chọn */}
          </Box>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="secondary"
            sx={{ marginTop: 2 }}
          >
            Close Modal
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
