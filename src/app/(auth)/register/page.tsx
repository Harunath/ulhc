import React, { Suspense } from "react";
import Registration from "./Registration";

const page = () => {
	return (
		<Suspense
			fallback={
				<div className=" min-h-14 flex justify-between items-center">
					<p>Loading...</p>
				</div>
			}>
			<Registration />
		</Suspense>
	);
};

export default page;
