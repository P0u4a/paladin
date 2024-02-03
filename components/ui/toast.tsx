import { Toaster } from 'react-hot-toast';

export default function Toast() {
    return (
        <Toaster
            toastOptions={{
                className: '',
                style: {
                    border: '1px solid #262626',
                    color: '#e7e5e4',
                    backgroundColor: '#0A0A0A',
                },
            }}
        ></Toaster>
    );
}
