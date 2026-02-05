import React, { useState, useEffect } from 'react'
import './App.css'

const BASE_URL = "http://localhost:8000/api"

function App() {
	return <InspectionsPage />
}

export default App

interface Inspection {
	id: number;
	vehicle_plate: string;
	inspection_date: string;
	status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
	notes: string;
}

interface InspectionFormData {
	vehicle_plate: string;
	inspection_date: string;
	status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
	notes: string;
}

function InspectionsPage() {
	const [inspections, setInspections] = useState<Inspection[]>([]);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [formData, setFormData] = useState<InspectionFormData>({
		vehicle_plate: '',
		inspection_date: '',
		status: 'scheduled',
		notes: ''
	});

	useEffect(() => {
		fetchInspections();
	}, []);

	const fetchInspections = async () => {
		try {
			setLoading(true);
			const response = await fetch(`${BASE_URL}/inspections/`);
			const data = await response.json();
			setInspections(data);
		} catch (error) {
			console.error('Error fetching inspections:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch(`${BASE_URL}/inspections/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				const newInspection = await response.json();
				setInspections(prev => [...prev, newInspection]);
				setFormData({
					vehicle_plate: '',
					inspection_date: '',
					status: 'scheduled',
					notes: ''
				});
				setShowForm(false);
			}
		} catch (error) {
			console.error('Error adding inspection:', error);
		}
	};

	const getStatusColor = (status: Inspection['status']): string => {
		const colors: Record<Inspection['status'], string> = {
			scheduled: 'bg-blue-100 text-blue-800',
			completed: 'bg-green-100 text-green-800',
			cancelled: 'bg-red-100 text-red-800',
			pending: 'bg-yellow-100 text-yellow-800'
		};
		return colors[status] || 'bg-gray-100 text-gray-800';
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-lg">Loading inspections...</div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-gray-800">Vehicle Inspections</h1>
				<button
					onClick={() => setShowForm(!showForm)}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					{showForm ? 'Close' : 'Add Inspection'}
				</button>
			</div>

			{showForm && (
				<div className="bg-white rounded-lg shadow-md p-6 mb-6">
					<h2 className="text-xl font-semibold mb-4">New Inspection</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Vehicle Plate
							</label>
							<input
								type="text"
								name="vehicle_plate"
								value={formData.vehicle_plate}
								onChange={handleInputChange}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="e.g., KDM200R"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Inspection Date
							</label>
							<input
								type="date"
								name="inspection_date"
								value={formData.inspection_date}
								onChange={handleInputChange}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Status
							</label>
							<select
								name="status"
								value={formData.status}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="scheduled">Scheduled</option>
								<option value="completed">Completed</option>
								<option value="pending">Pending</option>
								<option value="cancelled">Cancelled</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Notes
							</label>
							<textarea
								name="notes"
								value={formData.notes}
								onChange={handleInputChange}
								rows="3"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Any additional notes..."
							/>
						</div>

						<button
							type="submit"
							className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
						>
							Add Inspection
						</button>
					</form>
				</div>
			)}

			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				{inspections.length === 0 ? (
					<div className="p-8 text-center text-gray-500">
						No inspections found. Add your first inspection!
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										ID
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Vehicle Plate
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Inspection Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Notes
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{inspections.map((inspection) => (
									<tr key={inspection.id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{inspection.id}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											{inspection.vehicle_plate}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{new Date(inspection.inspection_date).toLocaleDateString()}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(inspection.status)}`}>
												{inspection.status}
											</span>
										</td>
										<td className="px-6 py-4 text-sm text-gray-900">
											{inspection.notes}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
