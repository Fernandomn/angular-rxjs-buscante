export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface Dimensions {
  height: string;
  width: string;
  thickness: string;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

export interface VolumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  pageCount: number;
  dimensions: Dimensions;
  printType: string;
  mainCategory: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  contentVersion: string;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface UserInfo {
  review: any; // Specify the actual structure if available
  readingPosition: any; // Specify the actual structure if available
  isPurchased: boolean;
  isPreordered: boolean;
  updated: string; // Assuming "datetime" is a string in RFC 3339 format
}

export interface SalePrice {
  amount: number;
  currencyCode: string;
}

export interface SaleInfo {
  country: string;
  saleability: string;
  onSaleDate: string; // Assuming "datetime" is a string in RFC 3339 format
  isEbook: boolean;
  listPrice: SalePrice;
  retailPrice: SalePrice;
  buyLink: string;
}

export interface Epub {
  isAvailable: boolean;
  downloadLink: string;
  acsTokenLink: string;
}

export interface Pdf {
  isAvailable: boolean;
  downloadLink: string;
  acsTokenLink: string;
}

export interface DownloadAccess {
  kind: string;
  volumeId: string;
  restricted: boolean;
  deviceAllowed: boolean;
  justAcquired: boolean;
  maxDownloadDevices: number;
  downloadsAcquired: number;
  nonce: string;
  source: string;
  reasonCode: string;
  message: string;
  signature: string;
}

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Pdf;
  webReaderLink: string;
  accessViewStatus: string;
  downloadAccess: DownloadAccess;
}

export interface SearchInfo {
  textSnippet: string;
}

export interface Volume {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  userInfo: UserInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo: SearchInfo;
}

export interface GoogleBooksSearchResult {
  kind: string;
  totalItems: number;
  items: Volume[];
}

export interface Livro {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  previewLink: string;
  thumbnail: string;
}
