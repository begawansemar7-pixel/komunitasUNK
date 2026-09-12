export interface PaymentRequest {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  itemDetails: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export interface PaymentResponse {
  transactionId: string;
  provider: 'xendit' | 'doku' | 'finnet' | 'qris_national';
  status: 'PENDING' | 'PAID' | 'FAILED';
  paymentUrl?: string;
  qrString?: string;
  expiryMinutes: number;
}

export interface IPaymentGateway {
  createTransaction(request: PaymentRequest): Promise<PaymentResponse>;
  checkStatus(transactionId: string): Promise<'PENDING' | 'PAID' | 'FAILED'>;
}

export class XenditProvider implements IPaymentGateway {
  async createTransaction(request: PaymentRequest): Promise<PaymentResponse> {
    return {
      transactionId: `XND-${Date.now()}-${request.orderId.slice(-4)}`,
      provider: 'xendit',
      status: 'PENDING',
      paymentUrl: `https://checkout.xendit.co/web/${request.orderId}`,
      qrString: '00020101021226580016ID.CO.QRIS.WWW0118936009180000000100',
      expiryMinutes: 60,
    };
  }

  async checkStatus(_transactionId: string): Promise<'PENDING' | 'PAID' | 'FAILED'> {
    return 'PAID';
  }
}

export class DokuProvider implements IPaymentGateway {
  async createTransaction(request: PaymentRequest): Promise<PaymentResponse> {
    return {
      transactionId: `DKU-${Date.now()}-${request.orderId.slice(-4)}`,
      provider: 'doku',
      status: 'PENDING',
      paymentUrl: `https://pay.doku.com/checkout/${request.orderId}`,
      expiryMinutes: 60,
    };
  }

  async checkStatus(_transactionId: string): Promise<'PENDING' | 'PAID' | 'FAILED'> {
    return 'PAID';
  }
}

export class FinnetProvider implements IPaymentGateway {
  async createTransaction(request: PaymentRequest): Promise<PaymentResponse> {
    return {
      transactionId: `FIN-${Date.now()}-${request.orderId.slice(-4)}`,
      provider: 'finnet',
      status: 'PENDING',
      paymentUrl: `https://finpay.co.id/pg/${request.orderId}`,
      expiryMinutes: 60,
    };
  }

  async checkStatus(_transactionId: string): Promise<'PENDING' | 'PAID' | 'FAILED'> {
    return 'PAID';
  }
}

export class PaymentGatewayFactory {
  static getGateway(providerName: string = process.env.PAYMENT_PROVIDER || 'xendit'): IPaymentGateway {
    switch (providerName.toLowerCase()) {
      case 'doku':
        return new DokuProvider();
      case 'finnet':
        return new FinnetProvider();
      case 'xendit':
      default:
        return new XenditProvider();
    }
  }
}
