import { getMenu } from '@repo/service-menu';
import PosInterface from '../../components/PosInterface';

export default async function PosPage() {
    const menuItems = await getMenu();
    return <PosInterface menuItems={menuItems} />;
}
