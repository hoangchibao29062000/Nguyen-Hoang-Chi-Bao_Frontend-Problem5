import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { productActions } from '../homeSlice';
import { RootState } from 'app/store';
import moment from 'moment';
import commonHelper from 'helper/common.helper';
import { Avatar, Box, Button, FormLabel, IconButton, Modal, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IProduct } from 'models';
import Grid from '@mui/material/Grid';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import { createClient } from '@supabase/supabase-js';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IUnit } from 'models/unit';
import { IShipping } from 'models/shipping';
import { IPlatform } from 'models/platform';
import { IConfig } from 'models/config';


//connect supabase để lưu ảnh
const supabaseUrl = 'https://ixgbnptihqukuoziiruu.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4Z2JucHRpaHF1a3VvemlpcnV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMDY2NzAsImV4cCI6MjA0NzU4MjY3MH0.LCg5UsDz3CNecIgVaWN6_Nv1SVT7C4rY54o-VKsKORs"
const supabase = createClient(supabaseUrl, supabaseKey)
const paginationModel = { page: 0, pageSize: 10 };
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  height: 600,
  p: 4,
  overflow: 'auto',
};

const now = new Date();

// phần này validate dữ liệu nhập
const validationSchema = Yup.object({
  name_product: Yup.string().required('Tên là bắt buộc'),
  price_input:
    Yup.number()
      .typeError("*** Yêu cầu số phải là số!! ***")
      .required("*** Không được để trống ***")
      .test(
        "isValidNumber",
        "Phải là số (cho phép số thập phân)",
        (value) => {
          return /^\d+(\.\d+)?(e[+-]?\d+)?$/i.test(String(value));
        }
      ).min(1).required('Giá bán là bắt buộc'),
  quantity_imported:
    Yup.number()
      .typeError("*** Yêu cầu số phải là số!! ***")
      .required("*** Không được để trống ***")
      .min(0).required('Số lượng là bắt buộc'),
  quantity_tock:
    Yup.number()
      .typeError("*** Yêu cầu số phải là số!! ***")
      .required("*** Không được để trống ***")
      .min(0).required('Số lượng tồn là bắt buộc'),
  description_product: Yup.string().required('Mô tả là bắt buộc'),
  percent_profit:
    Yup.number()
      .typeError("*** Yêu cầu số phải là số!! ***")
      .required("*** Không được để trống ***")
      .min(0, "% Lợi nhuận không quá dưới 0")
      .max(100, "% Lợi nhuận không quá 100")
      .required('% lợi nhuận là bắt buộc'),
});

export default function HomePage() {
  const { listProduct, listUnit, listPlatform, listConfig, listShipping } = useSelector((state: RootState) => state.product);
  const [searchText, setSearchText] = useState('');
  const [searchTextRow, setSearchTextRow] = useState('name_product');
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [open, setOpen] = useState(false);
  const [valueOpen, setValueOpen] = useState<IProduct>({
    id: "",
    id_platform: listPlatform.find((item: IPlatform) => item.name_platform === "Tiktok Shop")?.id,
    id_unit: listUnit.find((item: IUnit) => item.name_unit === "Tiktok Shop")?.id,
    name_product: "",
    images: "",
    price_input: "1",
    price_sell: "1",
    quantity_imported: "1",
    quantity_tock: "1",
    description_product: "<p>Đây là mô tả sản phẩm</p>",
    percent_profit: 0,//
    profit: 0,
    // price_list_temp: 0,
    is_sale: false,
    price_sale_list: 0,
    profit_sale: 0,
    percent_sale: 0,
    is_voucher: false,
    percent_voucher: 0,
    price_voucher_list: 0,
    profit_voucher: 0,
    percent_costs_platform: 0,
    costs_platform: 0,
    percent_costs_payment: 0,
    costs_payment: 0,
    percent_costs_box: 0,
    costs_box: 0,
    percent_costs_operating: 0,
    costs_operating: 0,
    percent_costs_tax: 0,
    costs_tax: 0,
    percent_costs_ads: 0,
    costs_ads: 0,
    percent_costs_affilate: 0,
    costs_affilate: 0,
    list_shipping: "",
    total_costs: 0,
    price_listing: 0,
    active: true,
    create_at: now.toString(),
    update_at: now.toString(),
  });
  const inintProduct: IProduct = {
    id: "",
    id_platform: listPlatform.find((item: IPlatform) => item.name_platform === "Tiktok Shop")?.id,
    id_unit: listUnit.find((item: IUnit) => item.name_unit === "Tiktok Shop")?.id,
    name_product: "",
    images: "",
    price_input: "1",
    price_sell: "1",
    quantity_imported: "1",
    quantity_tock: "1",
    description_product: "<p>Đây là mô tả sản phẩm</p>",
    percent_profit: 0,//
    profit: 0,
    // price_list_temp: 0,
    is_sale: false,
    price_sale_list: 0,
    profit_sale: 0,
    percent_sale: 0,
    is_voucher: false,
    percent_voucher: 0,
    price_voucher_list: 0,
    profit_voucher: 0,
    percent_costs_platform: 0,
    costs_platform: 0,
    percent_costs_payment: 0,
    costs_payment: 0,
    percent_costs_box: 0,
    costs_box: 0,
    percent_costs_operating: 0,
    costs_operating: 0,
    percent_costs_tax: 0,
    costs_tax: 0,
    percent_costs_ads: 0,
    costs_ads: 0,
    percent_costs_affilate: 0,
    costs_affilate: 0,
    list_shipping: "",
    total_costs: 0,
    price_listing: 0,
    active: true
  };
  const [selectedValue, setSelectedValue] = useState<IUnit>({
    id: "",
    name_unit: "",
    create_at: now,
    update_at: now,
    active: true
  });
  const [selectedPlatformValue, setSelectedPlatformValue] = useState<IPlatform>({
    id: "",
    name_platform: "",
    create_at: now,
    update_at: now,
    active: true
  });
  const [selectedShippingValue, setSelectedShippingValue] = useState<IShipping>({
    id: "",
    name_shipping: "",
    persent: 0,
    key: "",
    create_at: now,
    update_at: now,
    active: true
  });
  const [images, setImages] = useState<(File | string)[]>([
    "https://via.placeholder.com/300", // Hình mặc định
  ]);
  const [imagesFile, setImagesFile] = useState<File[]>([]);
  const dispatch = useDispatch();


  // lấy dữ liệu về từ database
  useEffect(() => {
    if (!listProduct.length) {
      dispatch(productActions.callListSuccess());
      dispatch(productActions.callListUnitSuccess());
      dispatch(productActions.callListPlatformSuccess());
      dispatch(productActions.callListConfigSuccess());
      dispatch(productActions.callListShippingSuccess());
    }
  }, [dispatch, listProduct.length]);

  // lọc sản phẩm theo type
  useEffect(() => {
    // Lọc sản phẩm dựa trên giá trị tìm kiếm
    const filtered = listProduct.filter((product: any) =>
      product[`${searchTextRow}`].toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, listProduct, searchTextRow]);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // hàm xử lý lưu sản phẩm
  const handleSubmitSave = async (value: IProduct) => {
    // nếu có thêm ảnh sẽ lấy ảnh và đẩy lên storage ở supabase và lấy về URL
    await handleUploadImage();
    const giabanSauloinhuan = (Number(value.price_input) * (value.percent_profit / 100)) + Number(value.price_input);
    const totalFee =
      (giabanSauloinhuan * (value.percent_costs_platform / 100)) +
      (giabanSauloinhuan * (value.percent_costs_payment / 100)) +
      (giabanSauloinhuan * (value.percent_costs_box / 100)) +
      (giabanSauloinhuan * (value.percent_costs_operating / 100)) +
      (giabanSauloinhuan * (value.percent_costs_tax / 100)) +
      (giabanSauloinhuan * (value.percent_costs_ads / 100)) +
      (giabanSauloinhuan * (value.percent_costs_affilate / 100)) + 25000
    const price_sell_listing_platform =
      giabanSauloinhuan -
      (giabanSauloinhuan * (value.percent_sale / 100)) + totalFee;
    const newValue: IProduct = {
      ...value,
      images: images.join(","),
      id_unit: selectedValue,
      id_platform: selectedPlatformValue,
      price_sell: price_sell_listing_platform,
      percent_profit: value.percent_profit * 100,
      profit_sale: giabanSauloinhuan * (value.percent_sale / 100),
      price_sale_list: giabanSauloinhuan - (giabanSauloinhuan * (value.percent_sale / 100)),
      percent_sale: value.percent_sale * 100,
      is_sale: value.percent_sale > 0 ? true : false,
      percent_costs_platform: value.percent_costs_platform * 100,
      costs_platform: giabanSauloinhuan * (value.percent_costs_platform / 100),
      percent_costs_payment: value.percent_costs_payment * 100,
      costs_payment: giabanSauloinhuan * (value.percent_costs_payment / 100),
      percent_costs_box: value.percent_costs_box * 100,
      costs_box: giabanSauloinhuan * (value.percent_costs_box / 100),
      percent_costs_operating: value.percent_costs_operating * 100,
      costs_operating: giabanSauloinhuan * (value.percent_costs_operating / 100),
      percent_costs_tax: value.percent_costs_tax * 100,
      costs_tax: giabanSauloinhuan * (value.percent_costs_tax / 100),
      percent_costs_ads: value.percent_costs_ads * 100,
      costs_ads: giabanSauloinhuan * (value.percent_costs_ads / 100),
      percent_costs_affilate: value.percent_costs_affilate * 100,
      costs_affilate: giabanSauloinhuan * (value.percent_costs_affilate / 100),
      list_shipping: selectedShippingValue.key,
      total_costs: totalFee
    };

    // sau đó thì call API lưu vào sever
    dispatch(productActions.callSaveSuccess(newValue));
    setImagesFile([]);
    handleClose();
  };

  // Hàm xử lý thay đổi hình ảnh
  const handleImageChange = (acceptedFiles: File[]) => {
    // Thêm file mới vào danh sách
    setImages((prev) => [...prev, ...acceptedFiles]);
    setImagesFile((prev) => [...prev, ...acceptedFiles]);
  };

  // Hàm xóa 1 hình ảnh
  const handleRemoveImage = (index: number) => {
    if ((index + 1) >= imagesFile.length) {
      setImagesFile((prev) => prev.filter((_, i) => i !== (index - 1)));
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadImage = async () => {
    if (imagesFile.length)
      for (let index = 0; index < images.length; index++) {
        const file = images[index];
        if (typeof file === "object") {
          const arly = file.name.replaceAll(" ", "")
          const name = arly.replaceAll(".", `${String(moment().unix())}.`);
          const { data, error } = await supabase.storage
            .from('image-product') // Tên bucket
            .upload(`public/${name}`, file); // Đường dẫn file
          if (error) throw error;
          const fullURL = `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`;
          images[index] = fullURL;
        }
      }
  };

  const renderImagePreview = (image: string | File) => {
    if (typeof image === "string") {
      return image; // Trả về URL trực tiếp
    }
    return URL.createObjectURL(image); // Tạo URL từ File
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: handleImageChange,
  });

  //hàm tính tổng số liệu
  const totalCost = (newValue: IProduct) => {
    return ((Number(newValue.price_input) * (newValue.percent_profit / 100 / 100)) + Number(newValue.price_input))
      * (newValue.percent_costs_platform / 100 / 100)
      + // Phí thanh toán
      ((Number(newValue.price_input) * (newValue.percent_profit / 100 / 100)) + Number(newValue.price_input))
      * (newValue.percent_costs_payment / 100 / 100)
      + // phí đóng gói
      ((Number(newValue.price_input) * (newValue.percent_profit / 100 / 100)) + Number(newValue.price_input))
      * (newValue.percent_costs_box / 100 / 100)
      + // phí vận hành
      ((Number(newValue.price_input) * (newValue.percent_profit / 100 / 100)) + Number(newValue.price_input))
      * (newValue.percent_costs_operating / 100 / 100)
      + // phí Thuế
      ((Number(newValue.price_input) * (newValue.percent_profit / 100 / 100)) + Number(newValue.price_input))
      * (newValue.percent_costs_tax / 100 / 100)
      + // phí quảng cáo
      ((Number(newValue.price_input) * (newValue.percent_profit / 100 / 100)) + Number(newValue.price_input))
      * (newValue.percent_costs_ads / 100 / 100)
      + // phí tiếp thị
      ((Number(newValue.price_input) * (newValue.percent_profit / 100 / 100)) + Number(newValue.price_input))
      * (newValue.percent_costs_affilate / 100 / 100)
      + 25000
  };

  const handleOpen = (params: IProduct) => {
    // gét thông tin cài đặt về sô liệu
    const feePayment = listConfig.find((item: IConfig) => item.key_config === "COSTS_PAYMENT_TIKTOK") ? Number(listConfig.find((item: IConfig) => item.key_config === "COSTS_PAYMENT_TIKTOK")?.value_config) : 0;
    const feePlatform = listConfig.find((item: IConfig) => item.key_config === "COSTS_PLATFORM_TIKTOK") ? Number(listConfig.find((item: IConfig) => item.key_config === "COSTS_PLATFORM_TIKTOK")?.value_config) : 0;
    const feeOperating = listConfig.find((item: IConfig) => item.key_config === "COST_OPERATING_TIKTOK") ? Number(listConfig.find((item: IConfig) => item.key_config === "COST_OPERATING_TIKTOK")?.value_config) : 0;
    const feeTax = listConfig.find((item: IConfig) => item.key_config === "COSTS_TAX") ? Number(listConfig.find((item: IConfig) => item.key_config === "COSTS_TAX")?.value_config) : 0;
    const feeBox = listConfig.find((item: IConfig) => item.key_config === "COSTS_BOX") ? Number(listConfig.find((item: IConfig) => item.key_config === "COSTS_BOX")?.value_config) : 0;
    const feeAds = listConfig.find((item: IConfig) => item.key_config === "COSTS_ADS_TIKTOK") ? Number(listConfig.find((item: IConfig) => item.key_config === "COSTS_ADS_TIKTOK")?.value_config) : 0;
    const feeaff = listConfig.find((item: IConfig) => item.key_config === "COSTS_AFF_TIKTOK") ? Number(listConfig.find((item: IConfig) => item.key_config === "COSTS_AFF_TIKTOK")?.value_config) : 0;

    const newValue: IProduct = {
      ...params,
      percent_profit: params.percent_profit / 100,
      percent_sale: params.percent_sale / 100,
      id_unit: selectedValue,
      id_platform: selectedPlatformValue,
      percent_costs_platform: feePlatform / 100,
      percent_costs_payment: feePayment / 100,
      percent_costs_box: feeBox / 100,
      percent_costs_tax: feeTax / 100,
      percent_costs_operating: feeOperating / 100,
      percent_costs_ads: feeAds / 100,
      percent_costs_affilate: feeaff / 100,
      total_costs: totalCost(params)
    };

    setValueOpen(newValue);
    // nếu đã chọn Unit rồi thì hiện theo Unit đã chọn ngược lại sẽ lấy unit mặc định 
    const selected = listUnit.find((option: IUnit) => option.id === params.id_unit?.id);
    if (selected) {
      setSelectedValue(selected);
    } else {
      setSelectedValue(listUnit[0])
    }
    // nếu đã chọn platform rồi thì hiện theo platform đã chọn ngược lại sẽ lấy platform mặc định 
    const selectedPlatform = listPlatform.find((option: IPlatform) => option.id === params.id_platform?.id);
    if (selectedPlatform) {
      setSelectedPlatformValue(selectedPlatform);
    } else {
      setSelectedPlatformValue(listPlatform[0])
    }
    const selectedShipping = listShipping.find((option: IShipping) => option.key === params.list_shipping);
    if (selectedShipping) {
      setSelectedShippingValue(selectedShipping);
    } else {
      setSelectedShippingValue(listShipping[1])
    }
    // sau đó nếu sản phẩm đó không có ảnh thì trả [], ngược lại thì sẽ chuyển đoạn text lưu ở database thành []
    setImages(params.images ? params.images.split(",") : [])
    setOpen(true);
  };

  // hàm xoá sản phẩm
  const handleDelete = (params: IProduct) => {
    dispatch(productActions.callDeleteSuccess({ id: params.id }));
  };

  //hàm select Unit
  const handleChangeUnit = (event: SelectChangeEvent) => {
    const selected = listUnit.find((option: IUnit) => option.id === event.target.value);
    if (selected) {
      setSelectedValue(selected);
    } else {
      setSelectedValue(listUnit[1]);
    }
  };

  //hàm select Shipping
  const handleChangeShipping = (event: SelectChangeEvent) => {
    const selected = listShipping.find((option: IShipping) => option.id === event.target.value);

    if (!selected) {
      setSelectedShippingValue(listShipping[1]);
    } else {
      setSelectedShippingValue(selected);
    }
  };

  //hàm select Platform
  const handleChangePlatform = (event: SelectChangeEvent) => {
    const selected = listPlatform.find((option: IPlatform) => option.id === event.target.value);
    if (selected) {
      setSelectedPlatformValue(listPlatform[1]);
    }
  };

  // hàm select cột type tìm kiếm sản phẩm
  const handleChangeRows = (event: SelectChangeEvent) => {
    setSearchTextRow(event.target.value);
  };

  const handleClose = () => {
    setOpen(false)
    setImagesFile([]);
  };

  // đây là tạo ra các cột và các trường dữ liệu khi data đỗ về
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'images',
      headerName: 'Ảnh sản phẩm',
      width: 70,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Avatar alt="Image" src={params.value.split(",")[0]} sx={{ width: 50, height: 50 }} />
      ),
    },
    { field: 'name_product', headerName: 'Tên sản phẩm', width: 130 },
    {
      field: 'price_input',
      headerName: 'Giá nhập',
      width: 100,
      valueFormatter: (params) => {
        return commonHelper.formatCurrency(params);
      },
    },
    {
      field: 'price_sell',
      headerName: 'Giá bán',
      width: 100,
      valueFormatter: (params) => {
        return commonHelper.formatCurrency(params);
      },
    },
    {
      field: 'quantity_imported',
      headerName: 'Số lượng nhập',
      width: 130,
      valueFormatter: (params) => {
        return commonHelper.formatNumber(params);
      },
    },
    {
      field: 'quantity_tock',
      headerName: 'Số lượng tồn',
      width: 130,
      valueFormatter: (params) => {
        return commonHelper.formatNumber(params);
      },
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 130,
      valueFormatter: (params) => {
        return moment(params).format('DD-MM-YYYY');
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Cập nhật',
      width: 130,
      valueFormatter: (params) => {
        return moment(params).format('DD-MM-YYYY');
      },
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 130,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <VisibilityIcon
            sx={{
              fontSize: 30,
              cursor: 'pointer',
              color: 'primary.main', // Màu mặc định
              '&:hover': {
                color: 'secondary.main', // Màu khi hover
              },
            }}
            onClick={(event) => {
              event.stopPropagation();
              handleOpen(params.row);
            }}
          />
          <DeleteForeverIcon
            sx={{
              fontSize: 30,
              cursor: 'pointer',
              color: 'error.main', // Màu mặc định
              '&:hover': {
                color: 'warning.main', // Màu khi hover
              },
            }}
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(params.row);
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* {detail} */}
        <Box sx={style}>
          <Grid container>
            <Grid item xs={5}>
              <Grid item xs={12} sx={{
                display: "flex",
                justifyContent: "center",
              }}>
                {/* Hiển thị hình ảnh */}
                <Grid container spacing={0} sx={{ mt: 2 }}>
                  <Grid item xs={4}
                    {...getRootProps()}
                    sx={{
                      p: 2,
                      border: "2px dashed #aaa",
                      borderRadius: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      marginRight: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input {...getInputProps()} />
                    <IconButton
                      sx={{
                        width: "80px", // Chiều rộng cố định
                        height: "80px", // Chiều cao cố định
                        background: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        "&:hover": { background: "rgba(0,0,0,0.7)" },
                      }}
                    >
                      <AddPhotoAlternateIcon sx={{ fontSize: "100" }} />
                    </IconButton>
                  </Grid>
                  {images.map((image, index) => (
                    <Grid item xs={4} key={index}>
                      <Box
                        sx={{
                          position: "relative",
                          width: "126.3px", // Chiều rộng cố định
                          height: "126.3px", // Chiều cao cố định
                          background: `url(${renderImagePreview(image)}) no-repeat center center / cover`,
                          borderRadius: 1,
                          // marginRight: 5,
                          overflow: "hidden",
                        }}
                      >
                        {/* Nút Xóa */}
                        <IconButton
                          onClick={() => handleRemoveImage(index)}
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            background: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            "&:hover": { background: "rgba(0,0,0,0.7)" },
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 12 }} />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}

                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={7}>
              <Formik
                initialValues={valueOpen}
                validationSchema={validationSchema} // Gắn schema validation
                onSubmit={handleSubmitSave} // Gọi handleSubmit khi form được submit
              >
                {({ values, handleChange, handleBlur, touched, errors, isSubmitting, setFieldValue }) => {
                  /// handle
                  const formatPercentProfit = () => {
                    console.log("Xin chào")
                  };
                  return (
                    <form>
                      <Box sx={{ width: "auto" }}>
                        <FormLabel>Tên sản phẩm</FormLabel>
                        <TextField
                          fullWidth
                          label="Tên"
                          id="name_product"
                          name="name_product"
                          value={values.name_product}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name_product && Boolean(errors.name_product)}
                          helperText={<ErrorMessage name="name_product" />}
                          sx={{ marginTop: 1 }}
                        />
                        <Grid container>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Giá nhập"
                              id="price_input"
                              name="price_input"
                              value={values.price_input}
                              // value={commonHelper.formatCurrency(values.price_input)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.price_input && Boolean(errors.price_input)}
                              helperText={<ErrorMessage name="price_input" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Giá bán"
                              id="price_sell"
                              name="price_sell"
                              value={
                                !(((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  -
                                  ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input)) * (values.percent_sale / 100)
                                  + // Phí sàn
                                  ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_platform / 100)
                                  + // Phí thanh toán
                                  ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_payment / 100)
                                  + // phí đóng gói
                                  ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_box / 100)
                                  + // phí vận hành
                                  ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_operating / 100)
                                  + // phí Thuế
                                  ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_tax / 100)
                                  + // phí quảng cáo
                                  ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_ads / 100)
                                  + // phí tiếp thị
                                  ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_affilate / 100)
                                  + 25000)
                                  ? 0
                                  : (((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                    -
                                    ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input)) * (values.percent_sale / 100)
                                    + // Phí sàn
                                    ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                    * (values.percent_costs_platform / 100)
                                    + // Phí thanh toán
                                    ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                    * (values.percent_costs_payment / 100)
                                    + // phí đóng gói
                                    ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                    * (values.percent_costs_box / 100)
                                    + // phí vận hành
                                    ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                    * (values.percent_costs_operating / 100)
                                    + // phí Thuế
                                    ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                    * (values.percent_costs_tax / 100)
                                    + // phí quảng cáo
                                    ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                    * (values.percent_costs_ads / 100)
                                    + // phí tiếp thị
                                    ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                    * (values.percent_costs_affilate / 100)
                                    + 25000)
                              }
                              // value={commonHelper.formatCurrency(values.price_sell)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.price_sell && Boolean(errors.price_sell)}
                              helperText={<ErrorMessage name="price_sell" />}
                              sx={{ marginTop: 1, width: "100%", }}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Số lượng nhập"
                              id="quantity_imported"
                              name="quantity_imported"
                              value={values.quantity_imported}
                              // value={commonHelper.formatCurrency(values.quantity_imported)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.quantity_imported && Boolean(errors.quantity_imported)}
                              helperText={<ErrorMessage name="quantity_imported" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Số lượng tồn"
                              id="quantity_tock"
                              name="quantity_tock"
                              value={values.quantity_tock}
                              // value={commonHelper.formatCurrency(values.quantity_tock)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.quantity_tock && Boolean(errors.quantity_tock)}
                              helperText={<ErrorMessage name="quantity_tock" />}
                              sx={{ marginTop: 1, width: "100%", }}
                            />
                          </Grid>
                          <Grid item xs={5} sx={{ paddingTop: 2 }}>
                            <FormControl fullWidth>
                              <Select
                                value={selectedValue.id}
                                id="demo-simple-select"
                                sx={{ width: "auto" }}
                                onChange={handleChangeUnit}
                              >
                                {
                                  listUnit.map((item: IUnit) => (
                                    <MenuItem value={item.id} key={item.id}>{item.name_unit}</MenuItem>
                                  ))
                                }
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={1} sx={{ paddingTop: 1 }}>

                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Tổng phí phải trả"
                              value={values.total_costs}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="% lợi nhuận"
                              id="percent_profit"
                              name="percent_profit"
                              value={values.percent_profit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onLoad={() => formatPercentProfit()}
                              error={touched.percent_profit && Boolean(errors.percent_profit)}
                              helperText={<ErrorMessage name="percent_profit" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Lợi nhuận"
                              id="profit"
                              name="profit"
                              value={!((Number(values.price_input) * (values.percent_profit / 100))) ? 0 : (Number(values.price_input) * (values.percent_profit / 100))}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.profit && Boolean(errors.profit)}
                              helperText={<ErrorMessage name="profit" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>

                          {/*  Giảm giá */}
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="% Giảm giá"
                              id="percent_sale"
                              name="percent_sale"
                              value={values.percent_sale}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.percent_sale && Boolean(errors.percent_sale)}
                              helperText={<ErrorMessage name="percent_sale" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Số tiền giảm"
                              id="profit_sale"
                              name="profit_sale"
                              value={
                                !(((Number(values.price_input) * (values.percent_profit / 100))
                                  + Number(values.price_input)) * (values.percent_sale / 100)) ? 0 : ((Number(values.price_input) * (values.percent_profit / 100))
                                    + Number(values.price_input)) * (values.percent_sale / 100)
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.profit_sale && Boolean(errors.profit_sale)}
                              helperText={<ErrorMessage name="profit_sale" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>

                          {/* Phí vận chuyển */}
                          <Grid item xs={5} sx={{ paddingTop: 2 }}>
                            <FormControl fullWidth>
                              <Select
                                value={selectedPlatformValue.id}
                                id="demo-simple-select-platform"
                                sx={{ width: "auto" }}
                                onChange={handleChangePlatform}
                              >
                                {
                                  listPlatform.map((item: IPlatform) => (
                                    <MenuItem value={item.id} key={item.id}>{item.name_platform}</MenuItem>
                                  ))
                                }
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={1} sx={{ paddingTop: 1 }}>

                          </Grid>

                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Phí Vận chuyển"
                              value={"25000"}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>

                          {/* Phí vận chuyển */}
                          <Grid item xs={5} sx={{ paddingTop: 2 }}>
                            <FormControl fullWidth>
                              <Select
                                value={selectedShippingValue.id}
                                id="demo-simple-select-ship"
                                sx={{ width: "auto" }}
                                onChange={handleChangeShipping}
                              >
                                {
                                  listShipping.map((item: IShipping) => (
                                    <MenuItem value={item.id} key={item.id}>{item.name_shipping}</MenuItem>
                                  ))
                                }
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={1} sx={{ paddingTop: 1 }}>

                          </Grid>

                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Phí Vận chuyển"
                              value={"25000"}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>

                          {/* Phí sàn */}
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="% Phí sàn"
                              id="percent_costs_platform"
                              name="percent_costs_platform"
                              value={values.percent_costs_platform}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.percent_costs_platform && Boolean(errors.percent_costs_platform)}
                              helperText={<ErrorMessage name="percent_costs_platform" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Số tiền phải trả phí sàn"
                              id="costs_platform"
                              name="costs_platform"
                              value={
                                !(((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_platform / 100)) ? 0 : ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                * (values.percent_costs_platform / 100)
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.costs_platform && Boolean(errors.costs_platform)}
                              helperText={<ErrorMessage name="costs_platform" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>
                          {/* Phí thanh toán */}
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="% Phí thanh toán"
                              id="percent_costs_payment"
                              name="percent_costs_payment"
                              value={values.percent_costs_payment}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.percent_costs_payment && Boolean(errors.percent_costs_payment)}
                              helperText={<ErrorMessage name="percent_costs_payment" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Số tiền phải trả phí thanh toán"
                              id="costs_payment"
                              name="costs_payment"
                              value={
                                !(((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_payment / 100)) ? 0 : ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                * (values.percent_costs_payment / 100)
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.costs_payment && Boolean(errors.costs_payment)}
                              helperText={<ErrorMessage name="costs_payment" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>
                          {/* Phí đóng gói */}
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="% Phí đóng gói"
                              id="percent_costs_box"
                              name="percent_costs_box"
                              value={values.percent_costs_box}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.percent_costs_box && Boolean(errors.percent_costs_box)}
                              helperText={<ErrorMessage name="percent_costs_box" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Phí đóng gói"
                              id="costs_box"
                              name="costs_box"
                              value={
                                !(((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_box / 100)) ? 0 : ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                * (values.percent_costs_box / 100)
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.costs_box && Boolean(errors.costs_box)}
                              helperText={<ErrorMessage name="costs_box" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>

                          {/* Phí vận hành */}
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="% Phí vận hành"
                              id="percent_costs_operating"
                              name="percent_costs_operating"
                              value={values.percent_costs_operating}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.percent_costs_operating && Boolean(errors.percent_costs_operating)}
                              helperText={<ErrorMessage name="percent_costs_operating" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Phí vận hành"
                              id="costs_operating"
                              name="costs_operating"
                              value={
                                !(((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_operating / 100)) ? 0 : ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                * (values.percent_costs_operating / 100)
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.costs_operating && Boolean(errors.costs_operating)}
                              helperText={<ErrorMessage name="costs_operating" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>

                          {/* Phí thuế */}
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="% Phí thuế"
                              id="percent_costs_tax"
                              name="percent_costs_tax"
                              value={values.percent_costs_tax}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.percent_costs_tax && Boolean(errors.percent_costs_tax)}
                              helperText={<ErrorMessage name="percent_costs_tax" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Phí thuế"
                              id="costs_tax"
                              name="costs_tax"
                              value={
                                !(((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_tax / 100)) ? 0 : ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                * (values.percent_costs_tax / 100)
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.costs_tax && Boolean(errors.costs_tax)}
                              helperText={<ErrorMessage name="costs_tax" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>

                          {/* Phí quảng cáo */}
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="% Phí quảng cáo"
                              id="percent_costs_ads"
                              name="percent_costs_ads"
                              value={values.percent_costs_ads}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.percent_costs_ads && Boolean(errors.percent_costs_ads)}
                              helperText={<ErrorMessage name="percent_costs_ads" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Phí quảng cáo"
                              id="costs_ads"
                              name="costs_ads"
                              value={
                                !(((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_ads / 100)) ? 0 : ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                * (values.percent_costs_ads / 100)
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.costs_ads && Boolean(errors.costs_ads)}
                              helperText={<ErrorMessage name="costs_ads" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>

                          {/* Phí quảng cáo */}
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="% Phí tiếp thị liên kết"
                              id="percent_costs_affilate"
                              name="percent_costs_affilate"
                              value={values.percent_costs_affilate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.percent_costs_affilate && Boolean(errors.percent_costs_affilate)}
                              helperText={<ErrorMessage name="percent_costs_affilate" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            <TextField
                              fullWidth
                              label="Phí tiếp thị liên kết"
                              id="costs_affilate"
                              name="costs_affilate"
                              value={
                                !(((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                  * (values.percent_costs_affilate / 100)) ? 0 : ((Number(values.price_input) * (values.percent_profit / 100)) + Number(values.price_input))
                                * (values.percent_costs_affilate / 100)
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.costs_affilate && Boolean(errors.costs_affilate)}
                              helperText={<ErrorMessage name="costs_affilate" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "100%" }}
                              disabled
                            />
                          </Grid>



                          <Grid item xs={6} sx={{ paddingTop: 1 }}>

                          </Grid>


                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            {/* <FormLabel>Ngày tạo sản phẩm</FormLabel> */}
                            <TextField
                              fullWidth
                              label="Ngày tạo sản phẩm"
                              id="create_at"
                              name="create_at"
                              value={moment(values.create_at).format("DD-MM-YYYY")}
                              // value={commonHelper.formatCurrency(values.create_at)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.create_at && Boolean(errors.create_at)}
                              helperText={<ErrorMessage name="create_at" />}
                              sx={{ marginBottom: 2, marginTop: 1, width: "auto" }}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ paddingTop: 1 }}>
                            {/* <FormLabel>Ngày cập nhật gần nhất</FormLabel> */}
                            <TextField
                              fullWidth
                              label="Ngày cập nhật gần nhất"
                              id="update_at"
                              name="update_at"
                              value={moment(values.update_at).format("DD-MM-YYYY")}
                              // value={commonHelper.formatCurrency(values.update_at)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.update_at && Boolean(errors.update_at)}
                              helperText={<ErrorMessage name="update_at" />}
                              sx={{ marginTop: 1, width: "100%", }}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={12} sx={{ paddingTop: 1, maxHeight: "auto", height: "auto" }}>
                            {/* <FormLabel>Mô tả sản phẩm</FormLabel>
                            <ReactQuill
                              value={values.description_product}
                              onChange={(content) => setFieldValue('description_product', content)}
                            />
                            {touched.description_product && errors.description_product && (
                              <Typography color="error" variant="body2">
                                {errors.description_product}
                              </Typography>
                            )} */}
                          </Grid>

                          <Grid item xs={12} sx={{ paddingTop: 1 }}>
                            <Button
                              type="button"
                              variant="contained"
                              color="primary"
                              sx={{ width: "50%" }}
                              onClick={() => handleSubmitSave(values)}
                              disabled={
                                isSubmitting ||
                                !values.name_product ||
                                !values.price_input ||
                                values.price_input === 0 ||
                                !values.quantity_imported ||
                                !values.quantity_tock || Object.keys(errors).length !== 0
                              } // Vô hiệu hóa nút submit khi đang gửi dữ liệu
                            >
                              Lưu
                            </Button>
                            <Button
                              type="button"
                              variant="contained"
                              color="error"
                              sx={{ width: "50%", }}
                              onClick={handleClose}
                            >
                              Đóng
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </form>
                  )
                }}
              </Formik>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Paper sx={{ height: '100%', width: '100%' }}>
        {/* Thanh tìm kiếm */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: 1,
            gap: 2, // Khoảng cách giữa các phần tử
          }}
        >
          {/* Select */}
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={searchTextRow}
              id="demo-simple-select-cot"
              onChange={handleChangeRows}
            >
              <MenuItem value="name_product">Tên sản phẩm</MenuItem>
              <MenuItem value="id">Mã sản phẩm</MenuItem>
            </Select>
          </FormControl>

          {/* TextField */}
          <TextField
            label="Tìm kiếm sản phẩm"
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            sx={{
              flexGrow: 1, // Chiếm không gian còn lại
            }}
          />

          {/* Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen(inintProduct)}
            sx={{
              height: "56px", // Độ cao đồng bộ với TextField
              borderRadius: "8px",
            }}
          >
            Thêm sản phẩm
          </Button>
        </Box>


        {/* Bảng dữ liệu */}
        <DataGrid
          rows={filteredProducts}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}
