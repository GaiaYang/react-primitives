# hooks

## useDialogController.ts

用於控制 `<dialog />` 事件

```ts
import {
  useDialogController,
  useDialogEvents,
} from "@/hooks/useDialogController";
```

`useDialogEvents` 用於監聽 `<dialog />` 事件並回傳對應回調

`useDialogController` 基於 `useDialogEvents` 的狀態管理，可以取得當前狀態、是否開啟、切換開啟
