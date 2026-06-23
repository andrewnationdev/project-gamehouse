import { useEffect, useState } from "react";
import styles from '../../styles/home.module.css'
import Layout from "../../components/layout";
import ProfileComponent from "../../components/screens/profile";
import LoadingComponent from "../../components/ui/loading";
import { useStore } from "../../store/store";

export default function ProfilePages() {
    const [isLoading, setIsLoading] = useState(true);

    const { search } = useStore();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 600);
    }, [])

    return <Layout
    >
        <main className={styles.main}>
            <div className="min-h-screen bg-[#1b2838] text-gray-200 font-sans transition-all duration-500">
                <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                    {isLoading ? (
                        <LoadingComponent />
                    ) : (
                        <ProfileComponent />
                    )}
                </div>
            </div>
        </main>
    </Layout>
}