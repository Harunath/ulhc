/* eslint-disable jsx-a11y/alt-text */
// pdf/ULHCRegistrationLetter.tsx
import React from "react";
import {
	Document,
	Page,
	View,
	Text,
	Image,
	StyleSheet,
} from "@react-pdf/renderer";

export type UlhcPdfProps = {
	name: string;
	dob: string;
	aadhaar: string;
	address: string;
	vrkpId: string;
	activationDate: string;
	expireDate: string;
	year: string;
};

const styles = StyleSheet.create({
	page: {
		backgroundColor: "#f1f3f5",
		padding: 24,
		fontSize: 11,
		fontFamily: "Helvetica",
	},
	card: {
		maxWidth: 600,
		margin: "0 auto",
		backgroundColor: "#ffffff",
		borderRadius: 8,
		padding: 20,
	},
	header: {
		backgroundColor: "#86f4ff",
		paddingVertical: 16,
		alignItems: "center",
		marginHorizontal: -20,
		marginTop: -20,
		marginBottom: 16,
	},
	logo: {
		width: 220,
		height: 42,
		objectFit: "contain",
	},
	titleSpacer: {
		marginTop: 4,
		fontSize: 8,
		color: "#ffffff",
	},
	paragraph: {
		marginBottom: 8,
		color: "#555555",
		lineHeight: 1.4,
	},
	strong: {
		fontWeight: "bold",
	},
	sectionTitle: {
		marginTop: 12,
		marginBottom: 6,
		color: "#0077b6",
		fontSize: 12,
		fontWeight: "bold",
	},
	row: {
		flexDirection: "row",
		fontSize: 10.5,
		marginBottom: 4,
	},
	cellLabel: {
		width: 120,
		fontWeight: "bold",
		color: "#333333",
	},
	cellValue: {
		flex: 1,
		color: "#333333",
	},
	contactRow: {
		flexDirection: "row",
		fontSize: 10.5,
		marginBottom: 2,
	},
	link: {
		color: "#0077b6",
	},
	footer: {
		marginTop: 16,
		paddingVertical: 8,
		backgroundColor: "#f1f3f5",
		textAlign: "center",
		fontSize: 9,
		color: "#666666",
		marginHorizontal: -20,
	},
});

export const ULHCRegistrationLetterPdf = ({
	name,
	dob,
	aadhaar,
	address,
	vrkpId,
	activationDate,
	expireDate,
	year,
}: {
	name: string;
	dob: string;
	aadhaar: string;
	address: string;
	vrkpId: string;
	activationDate: string;
	expireDate: string;
	year: string;
}) => {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.card}>
					{/* Header */}
					<View style={styles.header}>
						<Image
							src="https://res.cloudinary.com/degrggosz/image/upload/v1763016806/ULHC_Logo_PNG_1_gpbvmc.png"
							style={styles.logo}
						/>
						<Text style={styles.titleSpacer}> </Text>
					</View>

					{/* Body */}
					<Text style={styles.paragraph}>
						<Text style={{ color: "#333333", fontSize: 11 }}>Dear {name},</Text>
					</Text>

					<Text style={styles.paragraph}>
						We are delighted to welcome you to the{" "}
						<Text style={styles.strong}>Unity Life Health Care (ULHC)</Text>{" "}
						family as part of the{" "}
						<Text style={styles.strong}>
							VR Kisan Parivaar Membership Program
						</Text>
						. Through this program, you can now access healthcare services
						across the ULHC empaneled hospital network. Your membership is valid
						for three years, and we look forward to supporting you on your
						journey toward better health and well-being.
					</Text>

					<Text style={styles.sectionTitle}>Your Registration Details:</Text>

					<View>
						<View style={styles.row}>
							<Text style={styles.cellLabel}>Member Name:</Text>
							<Text style={styles.cellValue}>{name}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.cellLabel}>Member DOB:</Text>
							<Text style={styles.cellValue}>{dob}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.cellLabel}>Aadhaar Number:</Text>
							<Text style={styles.cellValue}>{aadhaar}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.cellLabel}>Member Address:</Text>
							<Text style={styles.cellValue}>{address}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.cellLabel}>Member ID:</Text>
							<Text style={styles.cellValue}>{vrkpId}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.cellLabel}>Activation Date:</Text>
							<Text style={styles.cellValue}>{activationDate}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.cellLabel}>Valid Upto:</Text>
							<Text style={styles.cellValue}>{expireDate}</Text>
						</View>
					</View>

					<Text style={[styles.paragraph, { marginTop: 10 }]}>
						For any assistance or queries regarding your healthcare services,
						please reach out to us at:
					</Text>

					<View>
						<View style={styles.contactRow}>
							<Text style={styles.cellLabel}>Website:</Text>
							<Text style={[styles.cellValue, styles.link]}>
								unitylifehealthcare.com
							</Text>
						</View>
						<View style={styles.contactRow}>
							<Text style={styles.cellLabel}>Email:</Text>
							<Text style={[styles.cellValue, styles.link]}>
								help@unitylifehealthcare.com
							</Text>
						</View>
						<View style={styles.contactRow}>
							<Text style={styles.cellLabel}>Phone:</Text>
							<Text style={[styles.cellValue, styles.link]}>
								+91 99086 33408
							</Text>
						</View>
					</View>

					<Text style={[styles.paragraph, { marginTop: 12 }]}>
						Thank you for choosing <Text style={styles.strong}>ULHC</Text>. We
						are committed to providing you with quality healthcare services with
						care and compassion.
					</Text>

					<Text style={[styles.paragraph, { marginTop: 10 }]}>
						Warm regards,
						{"\n"}
						<Text style={styles.strong}>Unity Life Health Care (ULHC)</Text>
					</Text>

					{/* Footer */}
					<View style={styles.footer}>
						<Text>© {year} Unity Life Health Care. All rights reserved.</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
};
