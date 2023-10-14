interface AlertProps {
	message: string;
	type?: "success" | "warning" | "error";
}

function BasicAlert(props: AlertProps) {
	const { message, type = "success" } = props;

	return (
		<div
			className={`alert alert-${type} alert-dismissible fade show text-center`}
			role="alert"
		>
			{message}
			<button
				type="button"
				className="btn-close"
				data-bs-dismiss="alert"
				aria-label="Close"
			/>
		</div>
	);
}

export default BasicAlert;
