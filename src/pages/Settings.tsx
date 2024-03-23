import { useUser } from '@/features/authentication/hooks/useUser';
import UpdateSettingsForm from '@/features/settings/UpdateSettingsForm';
import { useSettings } from '@/features/settings/hooks/useSettings';
import Heading from '@/ui/Heading';
import Spinner from '@/ui/spinner/Spinner';

function Settings() {
	const { data: user } = useUser();
	const { data: settings, isLoading } = useSettings(user?.id);
	return (
		<>
			<Heading as="h1">Update hotel settings</Heading>
			{isLoading ? (
				<Spinner />
			) : settings ? (
				<UpdateSettingsForm settings={settings} />
			) : (
				<p className="mt-1">Settings could not be loaded.</p>
			)}
		</>
	);
}

export default Settings;
