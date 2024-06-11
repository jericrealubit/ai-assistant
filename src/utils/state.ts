// import { proxy, useSnapshot } from "valtio";
// import { devtools } from "valtio/utils";

// interface State {
//   title: string;
//   selectedScreen: string;
// }

// const store = proxy<State>({
//   title: "NoW Toolkit",
//   azureOpenAICompletionResponseState: null,
//   selectedScreen: "/",
// });

// devtools(store, { name: "store" });

// export const useStore = () => {
//   return useSnapshot(store);
// };

// export const updateAzureOpenAICompletionResponse = (
//   azureOpenAICompletionResponse: AzureOpenAICompletionResponse | null
// ) => {
//   store.azureOpenAICompletionResponseState = azureOpenAICompletionResponse;
// };

// export const updateTitle = (title: string) => {
//   store.title = title;
// };

// export const updateSelectedScreen = (selectedScreen: string) => {
//   store.selectedScreen = selectedScreen;
// };
