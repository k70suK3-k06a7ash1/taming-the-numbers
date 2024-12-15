import { STORAGE_KEY } from "@/constants/storage-key";

export type StorageKeyType = (typeof STORAGE_KEY)[keyof typeof STORAGE_KEY];
