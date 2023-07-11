import axios from 'axios'
import { API_URL } from '../constants/constants'

// http://localhost:8085/api/vnpay/make?vnp_Amount=1000000&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang&vnp_OrderType=topup&vnp_ReturnUrl=https%3a%2f%2fsandbox.vnpayment.vn%2ftryitnow%2fHome%2fVnPayReturn
export const makePaymentVnpay = (order) => {
    return axios({
        method: 'POST', 
        // params: { vnp_Amount: order.vnp_Amount },
       
        // data: order
    }
      
        //&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+%3A5&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl&vnp_TmnCode=DEMOV210&vnp_TxnRef=5&vnp_Version=2.1.0&vnp_SecureHash=3e0d61a0c0534b2e36680b3f7277743e8784cc4e1d68fa7d276e79c23be7d6318d338b477910a27992f5057bb1582bd44bd82ae8009ffaf6d141219218625c42'
        // `${API_URL}/api/vnpay/make?vnp_Amount=${order.vnp_Amount}&vnp_Locale=vn&vnp_OrderInfo=${order.vnp_OrderInfo}&vnp_OrderType=250000&vnp_ReturnUrl=https%3a%2f%2fsandbox.vnpayment.vn%2ftryitnow%2fHome%2fVnPayReturn`
        
    )
}

//http://localhost:8085/api/vnpay/result?vnp_Amount=100000000&vnp_BankCode=NCB&vnp_BankTranNo=20210516085304&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+don+hang&vnp_PayDate=20210516085241&vnp_ResponseCode=00&vnp_TmnCode=VMMBOT14&vnp_TransactionNo=13505299&vnp_TxnRef=10242996&vnp_SecureHashType=SHA256&vnp_SecureHash=702c26064a301f66a8f943994255598ca420bb008d2ba3544b47caa8105bb8b7
export const resultPaymentVnPay = (order) => {
    return axios.get(
        `${API_URL}api/vnpay/result?vnp_Amount=${order.vnp_Amount}&vnp_BankCode=${order.vnp_BankCode}&vnp_BankTranNo=${order.vnp_BankTranNo}&vnp_CardType=ATM&vnp_OrderInfo=${order.vnp_OrderInfo}&vnp_PayDate=${order.vnp_PayDate}&vnp_ResponseCode=${order.vnp_ResponseCode}&vnp_TmnCode=VMMBOT14&vnp_TransactionNo=${order.vnp_TransactionNo}&vnp_TxnRef=${order.vnp_TxnRef}&vnp_SecureHashType=SHA256&vnp_SecureHash=702c26064a301f66a8f943994255598ca420bb008d2ba3544b47caa8105bb8b7`
    )
}

// http://localhost:8085/api/vnpay/make?vnp_Amount=1000000&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang&vnp_OrderType=topup&vnp_ReturnUrl=https%3a%2f%2fsandbox.vnpayment.vn%2ftryitnow%2fHome%2fVnPayReturn
export const makePaymentZaloPay = (order, params) => {
    return axios({
        method: 'POST',
        data: order,
        params: { appuser: params.appuser, amount: params.amount, order_id: params.order_id },
        url: `${API_URL}/api/zalopay/create-order`
    })
}

export const getStatusByAppTransIDZaloPay = (apptransid) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/zalopay/getstatusbyapptransid`,
        params: {apptransid: apptransid}
    })
}

// momo
export const makePaymentMomo = (params) => {
    return axios({
        method: 'POST',
        params: { amount: params.amount, order_id: params.order_id },
        url: `${API_URL}/api/momo/create-order`
    })
}

export const transactionStatusMomo = (params) => {
    return axios({
        method: 'POST',
        params: { requestId: params.requestId, orderId: params.orderId },
        url: `${API_URL}/api/momo/transactionStatus`
    })
}