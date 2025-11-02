import React, { Suspense } from "react";
import Registration from "./Registration";

const page = () => {
	return (
		<div className=" text-neutral-950">
			<Suspense
				fallback={
					<div className=" min-h-14 flex justify-between items-center">
						<p>Loading...</p>
					</div>
				}>
				<Registration />
			</Suspense>
		</div>
	);
};

export default page;
