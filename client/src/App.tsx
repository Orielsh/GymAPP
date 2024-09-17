import { MantineProvider } from "@mantine/core"
import Default from "./layouts/Default/Default"
import { theme } from "./styles/theme"
import '@mantine/core/styles.css';
import AuthProvider from "./contexts/AuthContext/AuthProvider";
import '@mantine/dates/styles.css';
import ToastProvider from "./contexts/ToastContext/ToastProvider";
import '@mantine/carousel/styles.css';

function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <ToastProvider>
          <Default />
        </ToastProvider>
      </AuthProvider>
    </MantineProvider>
  )
}

export default App