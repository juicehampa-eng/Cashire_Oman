// preload.ts
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('app', {
  // أمثلة مستقبلية لواجهات آمنة
  version: '1.0.0',
});
