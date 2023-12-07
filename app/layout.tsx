import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modal/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modal/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modal/RentModal';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Airbnb',
    description: 'Airbnb',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={nunito.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <RegisterModal />
                    <LoginModal />
                    <RentModal />
                    <Navbar currentUser={currentUser} />
                </ClientOnly>
                {children}
            </body>
        </html>
    );
}
