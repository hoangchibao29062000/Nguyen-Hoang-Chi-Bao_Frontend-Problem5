
export default class commonHelper {
    static formatCurrency(amount: number | string, local: string = 'vi-VN', currency: string = "VND"): string {
        return new Intl.NumberFormat(local, {
            style: 'currency', currency, minimumFractionDigits: Number(amount) % 1 === 0 ? 0 : 2, // Không có phân số nếu là số nguyên
            maximumFractionDigits: 2,
        }).format(Number(amount));
    }

    static formatNumber(amount: number | string, symbol: string = "", local: string = 'vi-VN',): string {
        return String(new Intl.NumberFormat(local, {
            minimumFractionDigits: Number(amount) % 1 === 0 ? 0 : 2,
            maximumFractionDigits: 2,
        }).format(Number(amount))) + symbol;
    }

    static formatNumberPercent(amount: number | string, local: string = 'vi-VN',): string {
        console.log(Number(amount), Number(amount) / 100, "Number(amount) / 100Number(amount) / 100")
        return Number(amount) / 100 + "%";
    }

    static deformatNumberPerent(formatted: string | number): number {
        const inSearch = String(formatted).search("%");
        if (inSearch < 0) {
            let num = String(formatted)
            return Number(num); // Chuyển chuỗi thành số
        } else {
            let num = String(formatted)
            num.replace(/[^\d,-]/g, '') // Loại bỏ tất cả ký tự không phải số, dấu `,`, dấu `.` hoặc dấu `-`
                .replace(/\./g, '')       // Loại bỏ tất cả dấu `.`
                .replace(',', '.'); // Chuyển dấu phân cách thập phân về dạng chuẩn (dấu chấm)
            console.log(num, inSearch, "inSearchinSearch")
            return Number(num) * 100; // Chuyển chuỗi thành số
        }


    }

    static deformatNumber(formatted: string | number): number {
        const num = String(formatted)
            .replace(/[^\d,.-]/g, '') // Loại bỏ tất cả ký tự không phải số, dấu `,`, dấu `.` hoặc dấu `-`
            .replace(/\./g, '')       // Loại bỏ tất cả dấu `.`
            .replace(',', '.'); // Chuyển dấu phân cách thập phân về dạng chuẩn (dấu chấm)

        return parseFloat(num); // Chuyển chuỗi thành số
    }
}